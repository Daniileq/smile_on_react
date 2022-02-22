import { useEffect, useState } from "react";

export function GetUrl() {
  const [facebookRepos, setFacebookRepos] = useState([]);
  const getData = async () => {
    let url = "https://api.github.com/users/facebook/repos";
    let response = await fetch(url);
    let makeJson = await response.json();
    setFacebookRepos(makeJson);
  };

  useEffect(async () => {
    getData();
  }, []);
  const DisplayFacebookRepos = facebookRepos.map((elem) => (
    <div key={elem.id}>{elem.node_id}</div>
  ));

  if (DisplayFacebookRepos == 0) {
    return <div>Loading...</div>;
  } else {
    return <div>{DisplayFacebookRepos}</div>;
  }
}
