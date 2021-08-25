const Index = require('./index.js');

const response = [{
    "id": "16",
    "createdAt": "2021-03-31T13:24:14.020Z",
    "name": "Ryann Wiegand",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/daykiine/128.jpg"
}, {
    "id": "17",
    "createdAt": "2021-03-31T14:36:34.443Z",
    "name": "Waldo Weimann",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dotgridline/128.jpg"
}];
describe('Task 1', () => {
    fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(response),
        })
    );
    it('should renders correct no of users', async() => {
        // mock getElementById 
        document.getElementById = jest.fn.mockReturnValue(`<div id="template"></div>`);
        // mock HandleBars.compile 

        await Index.start();
        const users = document.getElementsByClassName('user');
        expect(users.length).toBe(response.length);
    });
});