import React, { useContext } from 'react'
import "./WorkComponents.css"
import { Link } from 'react-router-dom'
import { faker } from '@faker-js/faker';
import { ProfileContext } from '../Profile/Profile';
import { MenuHeader } from '../GameComponents/Body/MenuHeader/MenuHeader';


function updateProfileWithJob(jobI, addEvents, setProfile, age) {

	
	if (age < 18) {
		addEvents('You are too young to work');
		return ;
	}
	setProfile(prevProfile => ({
		...prevProfile,
		job: jobI
	}));
	addEvents("You got a job as " + jobI.jobTitle)
	addEvents("You earn " + jobI.salary + " $ per year")
}

const biasedRandomBetween = (min, max) => {
	const rawRandom = Math.random();
	const scale = max - min;
	const biasedRandom = -Math.log(1 - rawRandom) / 10;
	if (biasedRandom > 1) return max;
	return Math.floor(biasedRandom * scale + min);
};


function JobGenerators() {
	const jobList = []
	const { addEvents, setProfile, profile } = useContext(ProfileContext)

	for (let i = 0; i < 100; i++) {
		const job = {
			jobTitle: faker.person.jobTitle(),
			salary: biasedRandomBetween(30000, 1300000)
		}
		jobList.push(job)
	}

	return (jobList.map((jobI, index) => {

		return (
			<button onClick={() => updateProfileWithJob(jobI, addEvents, setProfile, profile.age)} key={index}>
				<Link to='/'>
					<div className='WorkContainerSelect'>
						<p>{jobI.jobTitle}</p>
						<span>{jobI.salary} $</span>
					</div>
				</Link>
			</button>
		);
	}));
}

export const WorkComponents = () => {
	return (
		<div className='WorkContainers'>


			<MenuHeader>Work</MenuHeader>



			
			{JobGenerators()}
		</div>
	)
}
