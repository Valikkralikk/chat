const token =
  "vk1.a.vuKfZ-2uAryxleb1k9ITuWhTDagixDi4YmkS6mLVbf5H6qj0vX2WWbUd-edRAbDIfeZQZjHEhP42YdIK0qPo-K7Ee-FknQGxqLgwcVuN9S-CPW2AKKSC2pkjyIDdP4wXjvSrDN0r_nY2yexQzBc61V81YC76BRxMI-ogKVDcbA1JKBgK6YlQ3VlffcKiGbIb";
const user_id = 76857018;

const getResponse = async () => {
  const response = await fetch(
    `https://api.vk.com/method/friends.getOnline?v=5.131&access_token=${token}`
  );
  return response;
};

console.log(getResponse());
