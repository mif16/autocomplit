export default class DropDownList extends React.Component {
    render() {
        let list_cities = this.props.cities;
        let listItems = [];
        let ulStyle = {
            display: 'block'
        };
        let divStyle = {
            padding: '6px 9px',
            borderTop: '1px solid #efefef',
            color: 'grey'
        };
        if (list_cities.length == 0)
            if (this.props.value)
                listItems.push(<div style={divStyle}>Не найдено</div>);
            else
                return null;
        else {
            let lenList = list_cities.length;
            listItems = list_cities.slice(0, Math.min(this.props.maxCitiesInList, lenList)).map((city, index) => {
                if (index == this.props.selected)
                    return <li tabIndex="-1" key={index} className="selected">{city}</li>;
                return <li tabIndex="-1" key={index}>{city}</li>
            });
            if (lenList > this.props.maxCitiesInList)
                listItems.push(<div key={listItems.length} style={divStyle}>Показано {this.props.maxCitiesInList} из {list_cities.length}
                    найденных
                    городов.
                    Уточните запрос,
                    чтобы увидеть остальные</div>)
        }
        return <ul tabIndex="-1" className="cities_list"{...this.props} style={ulStyle}>{listItems}</ul>;
    }
}