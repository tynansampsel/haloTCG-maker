import './css/App.css';

function HomePage() {
	return (
		<div className="HomePage">
			Welcome to HaloTCG Maker! Here is a quick guide how to use this
			<ol>
				<li>go to Manage and create a new card set or upload an existing card set.</li>
				<li>go to Maker and either creating a new card or edit an existing card.</li>
				<li>go to Generate to generate the cards</li>
				<li>go to Manage and download your card set for future use</li>
			</ol>
		</div>
	);
}

export default HomePage;