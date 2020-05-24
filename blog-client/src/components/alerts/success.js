import React, {useState} from "react";
import { Alert } from "reactstrap";

export default function ErrorMessage (props){
	const [visible, setVisible] = useState(true);

	const onDismiss = () => setVisible(false);
	if (props.success!== "") {
		return (
			<div>
				<Alert color="success" isOpen={visible} toggle={onDismiss}>{props.success}</Alert>
			</div>
		);
	}
	return null;
};
