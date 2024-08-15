import React, { FunctionComponent } from "react";
import Toggle from "react-toggle";
import Select from "react-select";
import "react-toggle/style.css";
import "./preferencesModal.css";
import teamOptions from "../../assets/teamOptions.json";
import leagueOptions from "../../assets/leagueOptions.json";
import { useTheme } from "../../context/themeContext";

const PreferencesModal: FunctionComponent<any> = ({ preferences, setPreferences, setShowModal }) => {
	const { theme, toggleTheme } = useTheme();

	const handleToggleChange = (e: any) => {
		const { name, checked } = e.target;
		setPreferences((prev: any) => ({ ...prev, [name]: checked }));
	};


	const handleSelectChange = (name: string, options: any) => {
		setPreferences((prev: any) => ({ ...prev, [name]: options }));
	};


	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Welcome to wiseDisplay!</h2>
				<p>Please set your preferences below:</p>
				<form>
				<div className="form-group">
						<label htmlFor="themeToggle">Dark Mode</label>
						<Toggle
							id="darkMode"
							name="daarkmode"
							checked={theme === 'dark'}
							onChange={toggleTheme}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="liveOnly">Live Games Only</label>
						<Toggle
							id="liveOnly"
							name="liveOnly"
							checked={preferences.liveOnly}
							onChange={handleToggleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="favTeamsOnly">Highlight Favorite Teams</label>
						<Toggle
							id="favTeamsOnly"
							name="favTeamsOnly"
							checked={preferences.favTeamsOnly}
							onChange={handleToggleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="dailyOnly">Daily Only</label>
						<Toggle
							id="dailyOnly"
							name="dailyOnly"
							checked={preferences.dailyOnly}
							onChange={handleToggleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="leagues">Leagues</label>
						<Select
							id="leagues"
							name="leagues"
							value={preferences.leagues}
							options={leagueOptions}
							isMulti
							onChange={(options: any) => handleSelectChange("leagues", options)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="favTeams">Favorite Teams</label>
						<Select
							id="favTeams"
							name="favTeams"
							value={preferences.favTeams}
							options={teamOptions}
							isMulti
							onChange={(options: any) => handleSelectChange("favTeams", options)}
						/>
					</div>
					<button type="button" onClick={handleClose}>
						Save and Close
					</button>
				</form>
			</div>
		</div>
	);
}

export default PreferencesModal;