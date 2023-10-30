export const redirect = (url) => {
  window.history.pushState({}, "", "/login");
};

export const randomString = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export const truncateString = (text, maxCharacters) => {
  if(!text){
    return;
  }
  if (text.length <= maxCharacters) {
    return text;
  } else {
    const truncated = text.slice(0, maxCharacters);
    return truncated + '...';
  }
}