const Togglable = (props) => {
  if (props.isOpen) {
    return (
      <div>
        {props.children}
        <button onClick={props.toggleOpen}>cancel</button>
      </div>
    );
  }
  return <button onClick={props.toggleOpen}>{props.buttonLabel}</button>;
};

export default Togglable;
