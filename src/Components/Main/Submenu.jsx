import React from "react";
import Submenu from './Submenu.jsx'

class Menu extends React.Component {
    render() {
        let key = this.props.child.id.toString() + '-' + this.props.childKey;
        return (
            <div className="flex flex-wrap mb-[1rem]" key={key}>
                <div className="basis-full lg:basis-6/12 capitalize pl-[2rem]">
                    <div>
                        {this.props.child.id}
                    </div>
                </div>
                <div className="basis-full ml-[2rem] lg:ml-[0rem] lg:basis-2/12 flex lg:justify-end">
                    <div className="my-[0.5rem] flex items-center">
                        <div className="toggle slim colour">
                            <input id={this.props.child.id + 'show'} className="toggle-checkbox hidden" type="checkbox" defaultChecked={this.props.child.isShowed} onChange={e => this.props.updateShowValue(this.props.child.id)} />
                            <label htmlFor={this.props.child.id + 'show'} className="toggle-label block w-12 h-[14px] rounded-full transition-color duration-150 ease-out"></label>
                        </div>
                        <div className="ml-[2rem] lg:hidden">
                            Show
                        </div>
                    </div>
                </div>
                <div className="basis-full ml-[2rem] lg:ml-[0rem] lg:basis-2/12 flex lg:justify-end">
                    <div className="my-[0.5rem] flex items-center">
                        <div className="toggle slim colour">
                            <input id={this.props.child.id + 'allow'} className="toggle-checkbox hidden" type="checkbox" defaultChecked={this.props.child.isAllowed} onChange={e => this.props.updateAllowValue(this.props.child.id)} />
                            <label htmlFor={this.props.child.id + 'allow'} className="toggle-label block w-12 h-4 rounded-full transition-color duration-150 ease-out"></label>
                        </div>
                        <div className="ml-[2rem] lg:hidden">
                            Active
                        </div>
                    </div>
                </div>
                <div className={`basis-full pt-[1rem]`}>
                    {this.props.child.childs !== undefined ? (
                        this.props.child.childs.map((child, childKey) => {
                            return (
                                <Submenu child={child} key={childKey} updateShowValue={this.props.updateShowValue} updateAllowValue={this.props.updateAllowValue} leftValue={this.props.leftValue+2} />
                            )
                        })
                    ) : null}
                </div>
            </div>
        )
    }
}

export default Menu;