import DropDownList from './dropDownList.jsx';
import Input from './input.jsx';
import getAllCities from './allCitiesFromJSON.jsx'


function filter_list(value, list) {
    if (value.length == 0) return [];
    return list.sort().filter(str => str.match(new RegExp('^' + value, 'i')))
}


const focusInCurrentTarget = ({relatedTarget, currentTarget}) => {
    if (relatedTarget === null) return false;

    let node = relatedTarget.parentNode;

    while (node !== null) {
        if (node === currentTarget) return true;
        node = node.parentNode;
    }

    return false;
};

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_cities: null,
            cities: [],
            value: '',
            selected: 0,
            opened: false,
            error: '',
            loaded: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this._choose = this._choose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    handleChange(event) {
        let value = event.target.value;
        let cities = [];
        let error = '';
        if (this.state.all_cities) {
            cities = filter_list(value, this.state.all_cities);
            if (value && cities.length == 0)
                error = 'warning';
        }
        this.setState({
            error: error,
            opened: true,
            value: value,
            cities: cities,
            selected: 0
        });
        this.load();
    }

    load() {
        this.setState({loaded: true});
        getAllCities('kladr.json').then(data => {
            this.setState({loaded: false, all_cities: data})
        });
    }

    handleBlur(event) {
        if (focusInCurrentTarget(event))
            return;
        this.setState({
            opened: false
        });
        if (this.state.error == 'warning')
            this.setState({error: 'error'});
        if (this.state.cities.length == 1)
            this._choose(0);

        //обработка предупреждений\ошибок
    }

    _choose(index) {
        this.setState({
            value: this.state.cities[index],
            opened: false,
            cities: [],
            selected: 0
        })
    }

    handleKey(event) {
        let items = this.state.cities;
        let stop = false;
        if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && items) {
            event.preventDefault();
            stop = true;

            const step = event.key === 'ArrowUp' ? -1 : 1;
            let selected = this.state.selected + step;
            if (selected == Math.min(items.length, this.props.maxCitiesInList) || selected < 0) {
                selected = this.state.selected;
            }
            this.setState({selected});
        } else if (event.key === 'Enter') {
            if (items && items[this.state.selected]) {
                event.preventDefault();
                stop = true;

                this._choose(this.state.selected);
            } else {
                this.setState({
                    opened: false,
                    cities: []
                });
            }
        } else if (event.key === 'Escape' && items && items.length) {
            event.preventDefault(); // Escape clears the input on IE.
            stop = true;
            this.setState({opened: false, cities: []});
        }

        if (!stop && this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    handleClick(event) {
        if (event.target.tagName != "LI") return;
        let index: number = this.state.cities.findIndex(city => city == event.target.innerHTML);
        this._choose(index);
    }

    render() {
        let value = this.state.value;
        let inputProps = {
            value: value,
            onKeyDown: this.handleKey,
            onChange: this.handleChange
        };
        let dropDownListProps = {
            maxCitiesInList: this.props.maxCitiesInList,
            value: value,
            cities: this.state.cities,
            selected: this.state.selected,
            onClick: this.handleClick
        };
        let dropDownList = null;
        let loading = null;
        if (this.state.loaded)
            loading = <div className="loading"> Загрузка</div>;
        else if (this.state.opened)
            dropDownList = <DropDownList {...dropDownListProps}/>;
        let error = null;
        if (this.state.error == 'warning')
            error = <div className="warning">Значения нет в справочнике. Возможно, вы ошиблись в написании</div>;
        else if (this.state.error == 'error')
            error = <div className="error">Выберите значение из списка</div>;
        return (
            <div className="delivery_block" onBlur={this.handleBlur}>
                <Input {...inputProps}/>
                {dropDownList}
                {loading}
                {error}
            </div>);
    }
}

ReactDOM.render(<Autocomplete maxCitiesInList="5"/>, document.getElementById('root'));