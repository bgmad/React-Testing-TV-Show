import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react'

import Episodes from './Episodes';

test('Component renders without errors', () => {
    render(<Episodes episodes={[]}/>);
});

/*
episodes = [
    {
        id: //int (6 digit)
        image: //obj
        season: //int
        number: //int
        name: //str
        summary: //str (parse to jsx)
        runtime: //int
    },
    {
        id: //int (6 digit)
        image: //obj
        season: //int
        number: //int
        name: //str
        summary: //str (parse to jsx)
        runtime: //int
    },
    ...
]
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getRandId = () => {
    return getRandomInt(100000, 999999);
}

const getRandImage = () => {
    return {medium: ""};
}

const getRandSeason = () => {
    return getRandomInt(1, 4);
}

const getRandString = (min, max) => {
    const bank = 'abcdefghijklmnopqrstuvwxyz . ? ! ,'.split('');
    let arrResp = [];
    const nameLength = getRandomInt(min, max);
    for(let i = 0; i < nameLength; i++) {
        arrResp.push(bank[getRandomInt(0, bank.length - 1)])
    }
    return arrResp.join('');
}

const getRandSummary = () => {
    return `<p>${getRandString(250, 501)}</p>`
}


const createRandomSeason = (numOfEpisodes) => {
    const seasonNum = getRandSeason();
    let season = []
    for(let i = 0; i < numOfEpisodes; i++){
        season.push({
            id: getRandId(),
            image: getRandImage(),
            season: seasonNum,
            number: i,
            name: getRandString(6, 20),
            summary: getRandSummary(),
            runtime: getRandomInt(45, 61)
        });
    }
    return season;
}

// console.log(createRandomSeason(6));

test('renders passed data through props', async () => {
    const episodes = createRandomSeason(6);
    render(<Episodes episodes={episodes}/>);

    const seasonsDisplayed = await screen.findAllByText(/season /i);
    const episodesDisplayed = await screen.findAllByText(/episode /i);

    expect(seasonsDisplayed).toHaveLength(episodes.length); // this will be one more than the number of episodes because of the dropdown
    expect(episodesDisplayed).toHaveLength(episodes.length); 

    for(let i = 0; i < episodes.length; i++){
        const id = screen.getByTestId(`${episodes[i].id}`);
        const ep = screen.getByText(episodes[i].name);
        const sum = screen.getByText(episodes[i].summary.slice(3, episodes[i].summary.length - 4));
    
        expect(id).toBeTruthy();
        expect(ep).toHaveValue(episodes[i].name);
        expect(sum).toHaveValue(episodes[i].summary);
    }

    
})

