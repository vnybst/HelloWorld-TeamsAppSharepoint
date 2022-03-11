import * as React from 'react';
import styles from './HelloworldReact.module.scss';
import { IHelloworldReactProps } from './IHelloworldReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState } from 'react';

interface State {
  data: any;
  DataisLoaded: boolean;
  url: string;
}

export default class HelloworldReact extends React.Component<IHelloworldReactProps, State> {

 
  public state: State = {
    data: {},
    DataisLoaded: true,
    url:"https://api.coindesk.com/v1/bpi/currentprice.json"
  };

  public getBTCPrice() {
    this.setState({ DataisLoaded: false });
    console.log("BtcPrice");

    fetch(
      this.state.url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: json,
          DataisLoaded: true
        });
        console.log(json);
      });
  }

  public render(): React.ReactElement<IHelloworldReactProps> {

    const handleEvent = (e) => {
      e.preventDefault()
      console.log('button clicked')
      this.getBTCPrice()
    }

    return (

      <div style={{ height: "100%" }}>
        <form className={styles.form} onSubmit={handleEvent}>
          <label>Url:</label>
          <input className='input' id="name" placeholder="Enter something" type="text" value={this.state.url} name="name" />
          <button className='input' type='submit' value="Submit" >
            Fetch
          </button>
          <div style={{ marginTop: "10" }}>
            {
              !this.state.DataisLoaded ? "Loading..." : (this.state.data !== undefined && Object.keys(this.state.data).length > 0) ? "Disclaimer: " + this.state.data?.disclaimer : ""
            }

            <table style={{ width: "300", margin: "auto", marginTop: "20" }}>
              <tr>
                {this.state.data !== undefined && Object.keys(this.state.data).length > 0 ? Object.entries(this.state.data.bpi).map(([item1, item2]) => {
                  return (
                    <th>
                      {
                        item1
                      }
                    </th>
                  )

                }) : ""
                }
              </tr>
              <tr>
                {

                  this.state.data !== undefined && Object.keys(this.state.data).length > 0 ? Object.entries(this.state.data.bpi).map(([item1, item2]) => {

                    return (
                      <td>
                        {
                          item2["rate"]
                        }
                      </td>
                    )

                  }) : ""

                }
              </tr>
            </table>

          </div>
        </form>
      </div>

    );
  }
}
