import { useStore } from "@nanostores/react";
import { testVar, addTestItem, testItems } from "../../stores/testStore";
import './TestReactComponent.css'; 

export default function TestReactComponent() {
  const $refTestVar = useStore(testVar);
  const $refTestItems = useStore(testItems);

  const usersList = Object.entries($refTestItems).map(([key, user]) => (
    <div key={key}>
      {user.name.first} {user.name.last} | {user.email} ({user.gender})
    </div>
  ));

  return (
    <section className="react-component">
      <h3>Questo è un componente REACT</h3>
      <p>State in React: {String($refTestVar)}</p> {/* Convert boolean to string for rendering */}
      <div>
        {usersList}
      </div>
    </section>
  );
}
