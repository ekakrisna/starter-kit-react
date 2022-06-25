const fakeGetAccessToken = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve("this-is-exampleofaccessTokennlqwjekr-asdfkqqwklerg");
    }, 900);
  });

export const loginApi = async ({ email, password }) => {
  try {
    const accessToken = await fakeGetAccessToken();
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
