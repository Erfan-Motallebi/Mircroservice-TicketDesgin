export default function Header({ currentUser }) {
  return (
    <div>
      <h1>Email: {currentUser.email}</h1>
    </div>
  );
}
