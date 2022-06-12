const makeActionCreator =
  (type: any, ...argNames: any[]) =>
  (...args: any[]) => {
    console.log("???? action creator", type);
    const action = { type };
    // console.log("make action creator: ", type);
    argNames.forEach((arg: any, index: number) => {
      // @ts-ignore: Unreachable code error
      action[arg] = args[index];
    });
    console.log("???? action creator action", action);
    return action;
  };

export { makeActionCreator };
