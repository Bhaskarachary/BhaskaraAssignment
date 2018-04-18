import React from 'react';
import ReactDOM from 'react-dom';
import Accordion from './lib/components/acordian';
import AccordionHeader from './lib/components/acordian/header';
import AccordionBody from './lib/components/acordian/body';
import AccordionHeaderList from './lib/components/acordian/header/list';
import AccordionBodyList from './lib/components/acordian/body/list';
import Navs from './lib/components/navs';

import Input from './lib/components/input';

import myData from './myStaticDta';



class Sam extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active:Object.keys(myData).map(i=>0),
            activeTab:"Requirements",
            progress: 'Click to start',
            myData
        };
        this.handelFuncChange = this.handelFuncChange.bind(this);
        this.startCheck = this.startCheck.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    handelFuncChange(data,i1,typ,ind2,ind3){
        let st = this.state.myData;
        if(!ind3){st[i1][ind2][typ] = data;}
        else st[i1][ind2][typ][ind3-1] = data;
        this.setState({myData:st})
    }
    handelNextChange(dataOriginal,ind,isFailCase){
        let tmpData = parseInt(dataOriginal);
        if(tmpData && tmpData > 0) {
            let st = this.state.myData;
            st.rules[ind][isFailCase ? 'nextOnFail' : 'nextOnSuccess'] = tmpData;
            this.setState({myData: st})
        }
    }

    startCheck(){
        this.state.myData.rules.forEach((item,ind,arr)=>{
            setTimeout( ()=>{
                this.setState({
                    active:ind,
                    progress:ind<arr.length-1?"checking flow in rule: "+ind:"Cheers! check complete"
                })
            },1000*ind)
        })
    }
    changeTab(p){this.setState({activeTab:p})}

    render(){
        let kys = Object.keys(this.state.myData);
        return (<div>
                <Navs items={kys} active={kys.indexOf(this.state.activeTab)} onClick={data=>this.changeTab(data)} />
                <div>
                    {
                        kys.map((i1,ind1)=>{
                           return this.state.activeTab===i1 ? (<Accordion active={this.state.active[ind1]}>
                               <AccordionHeaderList>
                                   {
                                       this.state.myData[i1].map(i=><AccordionHeader>{i.title}</AccordionHeader>)
                                   }
                               </AccordionHeaderList>
                               <AccordionBodyList>
                                   {
                                       this.state.myData[i1].map((i,ind)=>{
                                           return (
                                               <AccordionBody>
                                                   <Input onChange={data=>{this.handelFuncChange(data,i1,'title',ind)}} label={'Title'} value={i.title} />
                                                   <Input onChange={data=>{this.handelFuncChange(data,i1,'summary',ind)}} label={'Summary'} value={i.summary} />
                                                   <Input onChange={data=>{this.handelFuncChange(data,i1,'description',ind)}} label={'Description'} value={i.description} />
                                                   {
                                                       i.notes.map((i2,ind2)=>{
                                                           return <Input key={"note_"+ind2} onChange={data=>{this.handelFuncChange(data,i1,'notes',ind,ind2+1)}} label={'Note '+(ind2+1)+': '} value={i2} />
                                                       })
                                                   }
                                               </AccordionBody>
                                           )
                                       })
                                   }
                               </AccordionBodyList>
                           </Accordion>):null
                        })
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Sam />, document.querySelector("#full_component"));
