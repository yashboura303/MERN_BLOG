import React, {useState} from "react";
import { Alert } from "reactstrap";

export default function ErrorMessage(props) {
	const [visible, setVisible] = useState(true);

	const onDismiss = () => setVisible(false);
	if (props.error !== "") {
		return (
			<div>
				<Alert color="danger" isOpen={visible} toggle={onDismiss} >{props.error}</Alert>
			</div>
		);
	}
	return null;
}
