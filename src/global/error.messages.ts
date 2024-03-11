export const defaultErrorMessage = {
  defaultError: {
    status: 500,
    message: "An error has occurred.",
  },
};

export const categoryErrorMessages = {
  categoryNotFound: {
    status: 404,
    message: "This category does not exist.",
  },
};

export const complaintErrorMessages = {
  complaintNotFound: {
    status: 404,
    message: "The complaint you are looking for does not exist in your list.",
  },
  notAuthDeleteComplaint: {
    status: 403,
    message: "Users are only authorized to delete complaints created by them.",
  },
};

export const userErrorMessages = {
  emailAlreadyInUse: {
    status: 409,
    message: "The email you are using is already in use.",
  },
  emailNotFound: {
    status: 404,
    message: "The email you are using does not exist.",
  },
  wrongPassword: {
    status: 401,
    message: "Incorrect password.",
  },
  notAuthenticated: {
    status: 401,
    message: "Not authenticated.",
  },
  notAuthorized: {
    status: 403,
    message: "Not authorized.",
  },
  incorrectOtp: {
    status: 401,
    message: "The OTP you entered is incorrect.",
  },
};
