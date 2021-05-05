import React from 'react'
import CustomLoader from './CustomLoader'
export default function LucidLoader(props) {
	return (
		<div className="fadeInUp">
			<div style={{display:"flex", justifyContent: "center", marginTop: 20}}>
                <img src="/logo_main.png" alt="mainlogo" />
            </div>
				<CustomLoader />
                <p style={{textAlign: 'center'}}>{props.message || "Loading"}</p>
		</div>
	)
}