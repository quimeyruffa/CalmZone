export const EditUserData = async (token, data) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    "http://localhost:3001/api/v1.1/user/profile",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return "error", error;
    });

  return res;
};
