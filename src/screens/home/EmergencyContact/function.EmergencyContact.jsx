import { URL } from "../../../Entities";

export const CreateContact = async (token, data, user_uid) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    user: user_uid,
    email: data.email,
    telephone: data.telephone,
    relation: data.relation,
    firstName: data.firstName,
    lastName: data.LastName,
    profilePictureUrl: data.profilePictureUrl ? data.profilePictureUrl :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dprofile&psig=AOvVaw1rgb6L8JoNCGl3QXuJ8OFY&ust=1691070342971000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIitwIqOvoADFQAAAAAdAAAAABAT"
      
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const result = await fetch(
  `${process.env.URL}/api/v1.1/user/contacts`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return "error", error;
    });

  return result;
};

export const GetContacts = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const result = await fetch(
    `${process.env.URL}/api/v1.1/user/contacts`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return "error", error;
    });
  return result;
};

export const DeleteContact = async (token, contact_id) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: contact_id,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const result = fetch(
    `${process.env.URL}/api/v1.1/user/contacts`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return "error", error;
    });

  return result;
};

export const EditContactData = async (token, data, id_contact) => {
  console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    `${process.env.URL}/api/v1.1/user/contacts/${id_contact}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });

    return res
};
