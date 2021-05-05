export default function CustomAd(props){
    return(
        <>
            <img width="100%" src={props.image} alt="ad_image" />
            <p style={{fontSize: 15, color: "#999", textAlign: "center"}}>{props.description}</p>
        </>
    )
}