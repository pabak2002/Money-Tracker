import "./App.css";
import { useState, useEffect } from "react";
// const URL = "http://localhost:4040/api";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance,setBalance] = useState(0);
  useEffect(() => {
    getTransactions().then((t) => {
      setTransactions(t);
    });
  }, [transactions]);

  async function getTransactions() {
    console.log(1234);
    const url = "http://localhost:4040/api" + "/transaction";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = "http://localhost:4040/api" + "/transaction";
    const price = name.split(" ")[0];
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
      });
    });
  }

  let sum = 0;
  for(const transaction of transactions){
    sum += transaction.price;
  }

  sum = sum.toFixed(2);
  setBalance(sum);
  const fraction = balance.split('.')[1];
  balance=balance.split('.')[0];
  return (
    <div>
      <main>
        <h1>${balance}<span>{fraction}</span></h1>
        <form onSubmit={addNewTransaction}>
          <div className="basics">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="+200 original samsung tv"
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={(ev) => setDatetime(ev.target.value)}
            />
          </div>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="description"
            />
          </div>
          <button type="submit">Add new Transaction</button>
        </form>
        <div className="transactions">
          {/* {console.log(tr} */}
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <div key={transaction.id} className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  {console.log(transaction.price)}
                  <div
                    className={`price ${
                      transaction.price < 0 ? "red" : "green"
                    }`}
                  >
                    {transaction.price}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
