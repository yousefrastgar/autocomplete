import React from "react";
import Loading from "../loading";
import "./autocomplete.css";
import {boldString, capitalizeString} from "../../helpers";

const AutoComplete = (
    {
        suggestions,
        onInput,
        loading,
        onSelect,
        selectedItem = {},
        selectionIdentifier,
        displayField
    }
) => {
    const [inputValue, setInputValue] = React.useState("");

    const suggestionsList = React.useRef(null);
    const autocompleteField = React.useRef(null);
    const searchField = React.useRef(null);

    let currentItem = -1;

    React.useEffect(() => {
        document.addEventListener("click", (event) => {
            if (autocompleteField?.current !== event.target && !autocompleteField?.current.contains(event.target)) {
                suggestionsList?.current.classList.add("closed");
            }
        });

        searchField?.current.addEventListener("keydown", (event) => {
            let suggestionsListItems = suggestionsList?.current.getElementsByTagName("li");
            if (suggestionsListItems) {
                if (event.keyCode === 40) {
                    currentItem++;
                    hoverItem(suggestionsListItems);
                } else if (event.keyCode === 38) {
                    currentItem--;
                    hoverItem(suggestionsListItems);
                } else if (event.keyCode === 13) {
                    event.preventDefault();
                    if (currentItem > -1) {
                        if (suggestionsListItems)
                            suggestionsListItems[currentItem].click();
                    }
                }
            }
        });

        return () => {
            document.removeEventListener("click", null);
            searchField?.current.removeEventListener("keydown", null);
        };
    }, []);

    const updateInputValue = event => {
        onInput(event.target.value);
        setInputValue(capitalizeString(event.target.value));
        openDropdown();
    }

    const openDropdown = () => {
        suggestionsList?.current.classList.remove("closed");
    }

    const hoverItem = (list) => {
        for (let i = 0; i < list.length; i++)
            list[i].classList.remove("hovered");
        if (currentItem >= list.length)
            currentItem = 0;
        if (currentItem < 0)
            currentItem = list.length - 1;
        list[currentItem].classList.add("hovered");
    }

    const selectItem = entry => {
        onSelect(entry);
        setInputValue(entry[displayField]);
        suggestionsList?.current.classList.add("closed");
    }

    return (
        <div ref={autocompleteField} className="material-form-field">
            <input
                type="text" ref={searchField} value={inputValue}
                placeholder={`search for ${displayField}`}
                onInput={updateInputValue} onFocus={openDropdown}
            />
            <label className="material-form-field-label">Start typing:</label>
            <ul ref={suggestionsList} className="material-dropdown closed">
                {loading ?
                    <Loading/>
                    :
                    suggestions?.length ? suggestions.map((entry, index) => (
                            <li
                                key={index}
                                className={selectedItem[selectionIdentifier] === entry[selectionIdentifier] ? "material-dropdown-selected" : ""}
                                onClick={() => selectItem(entry)}
                            >
                                <span
                                    dangerouslySetInnerHTML={boldString(entry[displayField], inputValue)}/>
                            </li>
                        ))
                        :
                        <p>{inputValue.length ? "No Results" : "Please type something to search"}</p>
                }
            </ul>
        </div>
    );
}

export default AutoComplete;
