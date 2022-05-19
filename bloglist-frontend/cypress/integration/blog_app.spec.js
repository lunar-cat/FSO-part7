/// <reference types="Cypress" />
const serverURL = 'http://localhost:3003';
const frontURL = 'http://localhost:3000';

describe('Blog app', function () {
  beforeEach(function () {
    // reset DB
    cy.request('POST', `${serverURL}/api/testing/reset`);
    cy.createUser('jose', 'lunar-cat', 'contraseña1234');
    cy.visit(frontURL);
  });

  it('Login form is shown by default', function () {
    cy.get('[data-cy="login-form"]');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      const creds = { username: 'lunar-cat', password: 'contraseña1234' };
      cy.get('input[data-cy="login-username"]').type(creds.username);
      cy.get('input[data-cy="login-password"]').type(creds.password);
      cy.get('button[data-cy="login-button"]').click();

      cy.contains('Logged as lunar-cat')
        .should('have.class', 'success');
    });
    it('fails with wrong credentials', function () {
      const creds = { username: 'lunar-cat', password: 'wrong-password' };
      cy.get('input[data-cy="login-username"]').type(creds.username);
      cy.get('input[data-cy="login-password"]').type(creds.password);
      cy.get('button[data-cy="login-button"]').click();

      cy.contains('invalid username or password')
        .should('have.class', 'error');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('lunar-cat', 'contraseña1234');
    });

    it('a blog can be created', function () {
      const blog = { title: 'cypress title', author: 'cypress author', url: 'cypress url' };
      cy.contains('new note').click();

      cy.get('[data-cy="blog-form"]');

      cy.get('input[data-cy="blog-title"]').type(blog.title);
      cy.get('input[data-cy="blog-author"]').type(blog.author);
      cy.get('input[data-cy="blog-url"]').type(blog.url);

      cy.get('button[data-cy="blog-button"]').click();

      cy.contains(`${blog.title} by ${blog.author}`);
    });

    describe('With a blog created', function () {
      beforeEach(function () {
        const blog = { title: 'cypress title', author: 'cypress author', url: 'cypress url' };
        cy.createBlog(blog);
        cy.visit(frontURL);
      });

      it('a blog can be liked', function () {
        cy.get('button[data-cy="blog-toggle-view"]').click();
        cy.contains('likes: 0').as('likes');
        cy.get('button[data-cy="blog-like-button"]').click();
        cy.get('@likes').should('have.text', 'likes: 1');
      });
      it('a blog can be removed', function () {
        cy.get('button[data-cy="blog-toggle-view"]').click();
        cy.get('button[data-cy="blog-remove-button"]').click().as('removeBtn');
        cy.get('@removeBtn').should('not.exist');
      });
    });

    describe('With a blog created by other user', function () {
      beforeEach(function () {
        cy.createSecondBlog();
        cy.visit(frontURL);
      });
      it('should be a blog created by "second"', function () {
        cy.get('button[data-cy="blog-toggle-view"]').click();
        cy.contains('second');
      });
      it('logged as first user, should not be able to delete it', function () {
        cy.get('button[data-cy="blog-toggle-view"]').click();
        cy.get('button[data-cy="blog-remove-button"]').should('not.exist');
      });
    });

    describe.only('With two blogs created', function () {
      beforeEach(function () {
        const blog1 = { title: 'The title with the most likes', author: 'cypress author', url: 'cypress url' };
        const blog2 = { title: 'The title with the second most likes', author: 'cypress author', url: 'cypress url' };
        cy.createBlog(blog2);
        cy.createBlog(blog1);
        cy.visit(frontURL);
      });
      it('they are sorted by amount of likes', function () {
        // show expanded
        cy.contains('The title with the most likes')
          .parent()
          .find('button[data-cy="blog-toggle-view"]').click();
        // like it
        cy.contains('The title with the most likes')
          .parent().parent()
          .find('button[data-cy="blog-like-button"]').click();
        // assert likes incresed to 1
        cy.contains('The title with the most likes')
          .parent().parent()
          .contains('likes: 1');
        // show expanded
        cy.contains('The title with the second most likes')
          .parent()
          .find('button[data-cy="blog-toggle-view"]').click();
        //  assert likes are equal to 0
        cy.contains('The title with the second most likes')
          .parent().parent()
          .contains('likes: 0');

        // assert that blogs are sorted by likes
        cy.get('div[data-cy="blog"]')
          .eq(0).should('contain', 'The title with the most likes');
        cy.get('div[data-cy="blog"]')
          .eq(1).should('contain', 'The title with the second most likes');
      });
    });
  });
});