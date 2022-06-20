const makeActionCreator =
  (type: any, ...argNames: any[]) =>
  (...args: any[]) => {
    const action = { type };
    // console.log("make action creator: ", type);
    argNames.forEach((arg: any, index: number) => {
      // @ts-ignore: Unreachable code error
      action[arg] = args[index];
    });
    return action;
  };

export { makeActionCreator };
