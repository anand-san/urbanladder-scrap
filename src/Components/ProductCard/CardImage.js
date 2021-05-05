 export default function CardImage(props) {
     return(
        <img alt="cat" src={props.src} width="100%" height="250" style={{borderTopRightRadius: 5, borderTopLeftRadius: 5}}/>
     )
 }