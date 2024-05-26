import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { withRouter } from "next/router";

import "../../assets/scss/SingleComponents/NotFound.scss";

class NotFound extends Component {
	render() {
		const { router } = this.props;
		return (
			<div className="not-found-container container">
				<Row noGutters={true}>
					<Col xs={12} lg={{ size: 8, offset: 2 }}>
						<div className="not-found-title-wrapper">
							<h1 className="not-found-title">Page Not Found</h1>
						</div>
						<div className="text-center main-page-button">
							<Button
								color="warning"
								className="orange-button"
								onClick={() => {
									router.push("/");
								}}
							>
								Main Page
							</Button>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(NotFound);
