export const regex = {
  alphabet: /^[a-zA-Z\s]+$/,
  alphabetNoSpace: /^[a-zA-Z]+$/,
  number: /^\d+$/,
  alphaNumeric: /^[a-zA-Z0-9\s]+$/,
  youTube:
    /^(?:(?:https?:\/\/)?(?:www\.|m\.|live\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11}))/,
};