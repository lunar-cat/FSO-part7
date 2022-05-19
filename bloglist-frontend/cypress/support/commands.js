const serverURL = 'http://localhost:3003';
const frontURL = 'http://localhost:3000';

Cypress.Commands.add('createUser', (name, username, password) => {
  cy.request({
    method: 'POST',
    url: `${serverURL}/api/users/`,
    body: { name, username, password }
  });
});
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${serverURL}/api/login/`,
    body: { username, password }
  }).then(({ body }) => {
    localStorage.setItem('logginBlogApp', JSON.stringify(body));
    cy.visit(frontURL);
  });
});
Cypress.Commands.add('createBlog', (blog) => {
  const { token } = JSON.parse(localStorage.getItem('logginBlogApp'));
  cy.request({
    method: 'POST',
    url: `${serverURL}/api/blogs/`,
    body: blog,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
});
Cypress.Commands.add('createSecondBlog', () => {
  const blog = { title: 'cant be deleted', author: 'cant be deleted', url: 'cypress url' };
  const user = { name: 'second', username: 'second-user', password: '1234contraseña' };
  cy.request({
    method: 'POST',
    url: `${serverURL}/api/users/`,
    body: user
  }).then(() => {
    cy.request({
      method: 'POST',
      url: `${serverURL}/api/login/`,
      body: { username: user.username, password: user.password }
    }).then(({ body }) => {
      const { token } = body;
      cy.request({
        method: 'POST',
        url: `${serverURL}/api/blogs/`,
        body: blog,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    });
  });

});