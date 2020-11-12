
// bd is 

export function generalFetch (username, password, url, bd) {
    fetch(url, {
        method: "POST",
        headers: new Headers({
            'Authorization': 'Basic '+btoa(username+":"+password),
          "Content-Type": "application/json",
        }),
        body: bd,
      }).then(function(response){
        if(!response.ok) {
      throw new Error("HTTP status "+response.status)
        }
        return response.json();
      }).then(data => console.log(data))
      .catch(error => alert(error));
}