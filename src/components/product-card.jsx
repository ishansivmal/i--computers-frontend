export default function ProductCard(props)
{
    return(
         console.log(props),
        <div>
    <h1>{props.name}</h1>
     <img src={props.img} alt="Random" />
     <p>{props.price}</p>
   </div>
    )
}