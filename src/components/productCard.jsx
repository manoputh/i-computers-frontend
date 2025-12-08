export default function ProductCard(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.img}/>
      <p>Price {props.Price}</p>
    </div>
  )
}