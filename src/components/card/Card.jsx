import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentRepo, getContributors } from "../actions/repos";
import { useSelector } from "react-redux";
import "./card.less";
import "../main/main.less";

const Card = () => {
	const navigate = useNavigate();
	const [repo, setRepo] = useState({ owner: {} });
	const { username, reponame } = useParams();
	const [contributors, setContributors] = useState([]);
	const isFetching = useSelector((state) => state.repos.isFetching);

	useEffect(() => {
		getCurrentRepo(username, reponame, setRepo);
		getContributors(username, reponame, setContributors);
	}, []);

	return (
		<div>
			<button onClick={() => navigate(-1)} className="back-btn">
				BACK
			</button>
			<div className="card">
				<img src={repo.owner.avatar_url} alt="" />
				<div className="name">{repo.name}</div>
				<div className="stars">{repo.stargazers_count}</div>
			</div>

			{isFetching === false ? (
				contributors.map((c, index) => (
					<div key={c.login}>
						{index + 1}. {c.login}
					</div>
				))
			) : (
				<div className="fetching"></div>
			)}
		</div>
	);
};

export default Card;
