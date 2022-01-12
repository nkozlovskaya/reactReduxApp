import React, { useState, useEffect } from "react";
import "./main.less";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getRepos } from "../actions/repos";
import Repo from "./repo/Repo";
import { setCurrentPage, isFetchError } from "../../redusers/reposReduser";
import { createPages } from "../../utils/pagesCreator";

const Main = () => {
	const dispatch = useDispatch();
	const repos = useSelector((state) => state.repos.items);
	const isFetching = useSelector((state) => state.repos.isFetching);
	const currentPage = useSelector((state) => state.repos.currentPage);
	const totalCount = useSelector((state) => state.repos.totalCount);
	const perPage = useSelector((state) => state.repos.perPage);
	const isFetchError = useSelector((state) => state.repos.isFetchError);
	const [searchValue, setSearchValue] = useState("");
	const pagesCount = Math.ceil(totalCount / perPage);

	const pages = [];

	createPages(pages, pagesCount, currentPage);

	useEffect(() => {
		dispatch(getRepos(searchValue, currentPage, perPage));
	}, [currentPage]);

	function serchHandler() {
		dispatch(setCurrentPage(1));
		dispatch(getRepos(searchValue, currentPage, perPage));
	}

	/* if (isFetchError) {
		return <Navigate to="/error" />;
	} */

	return (
		<div>
			{isFetchError && (
				<div className="alert alert-danger" role="alert">
					произошла ошибка! Пожалуйста обновите страницу!
				</div>
			)}
			<div className="search">
				<input
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					type="text"
					className="search-input"
				/>
				<button onClick={() => serchHandler()} className="seach-btn">
					Search
				</button>
			</div>

			{isFetching === false ? (
				repos.map((repo) => <Repo repo={repo} key={repo.id} />)
			) : (
				<div className="fetching"></div>
			)}

			<div className="pages">
				{pages.map((page, index) => (
					<span
						key={index}
						className={currentPage === page ? "current-page" : "page"}
						onClick={() => dispatch(setCurrentPage(page))}
					>
						{page}
					</span>
				))}
			</div>
		</div>
	);
};

export default Main;
