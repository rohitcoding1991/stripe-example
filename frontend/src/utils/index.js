export const getPhoneNumberWithDialCode = (selector = ".form-control") => {
  const inputValue =
    typeof document !== "undefined"
      ? document?.querySelector?.(selector)?.value ?? ""
      : "";

  let phoneInitialCode, typedPhoneNumber;

  let response = inputValue?.split?.(" ") || [];

  if (response.length > 0) {
    [phoneInitialCode, ...typedPhoneNumber] = response;
  }

  typedPhoneNumber = (typedPhoneNumber ?? [])
    ?.join?.("")
    ?.replace?.(/[^a-zA-Z0-9 ]/g, "");

  return {
    code: phoneInitialCode || "+91",
    phone: typedPhoneNumber,
  };
};

// export function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = "#";

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// clear local storage
export const clearLocalStorage = () => localStorage.clear();

// remove local storage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// set local storage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// get local storage
export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const localData = localStorage.getItem(key);

    if (!localData) return null;

    return JSON.parse(localData);
  }
};
