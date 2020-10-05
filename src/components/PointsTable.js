import React from 'react';

class PointsTable extends React.Component {
    serverEndpoint = require('../config.json').APIConfig.baseURL
    state = {
        data: []
    };

    componentDidMount() {
        fetch(
            this.serverEndpoint + '/scores'
        ).then(response => response.json())
            .then(data => {

                data.sort((a, b)=>{
                    return b.currScore - a.currScore ;
                })
                let index = data.findIndex((element)=> element.username === 'shrey@satta.group');
                let element = data[index];
                data.splice(index, 1);
                data.push(element)
                this.setState({ data: data })
            })
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr className="tableheader">
                            <th className="tablerow">Name</th>
                            <th className="tablerow">currScore</th>
                            <th className="tablerow">cumScore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((r) =>
                                (<tr className="tablerow" key={r._id}>
                                    <td className="tablerow">{this.capitalizeFirstLetter(r.username.split('@')[0])}</td>
                                    <td className="tablerow">{r.currScore}</td>
                                    <td className="tablerow">{r.cumScore + r.currScore}</td>
                                </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

setInterval(function () {
    console.log("fetching points");

    //TODO: Poll the server for updated scores

}, 5000);

export default PointsTable;