import React, { useState, useEffect } from 'react'
import { func } from 'prop-types'

import { settingsType } from 'types'

require('./Settings.scss')

const Settings = ({ settings, toggleSettings, updateSettings }) => {
    const [localDictionary, setlocalDictionary] = useState()
    useEffect(() => {
        if (settings.customDictionary) {
            setlocalDictionary(settings.customDictionary.join(', '))
        }
    }, [settings])

    const getArrayDict = () => {
        if (!localDictionary) {
            return null
        }

        let arrDict = localDictionary.split(',')
        if (arrDict.length === 1) {
            arrDict = localDictionary.split(' ')
        }
        arrDict.map((word) => word.trim()).filter((w) => !!w)

        return arrDict
    }

    const getErrors = () => {
        const dict = getArrayDict()

        // Allow null or empty to clear
        if (!dict || !dict.length) {
            return []
        }

        const errors = []
        if (dict.length < 50) {
            errors.push('Not enough words')
        }
        if (dict.length > 700) {
            errors.push('Too many words')
        }
        return errors
    }

    const save = () => {
        updateSettings({ customDictionary: getArrayDict() })
        toggleSettings()
    }

    return (
        <div className="Settings">
            <div className="content">
                <h3>
                    Custom dictionary
                    <span>(50 - 700 words, comma or space separated)</span>
                </h3>
                <textarea
                    placeholder="Add your custom dictionary here"
                    value={localDictionary}
                    onChange={(e) => setlocalDictionary(e.target.value)}
                />
                <p className="error">
                    &nbsp;
                    {getErrors().join('. ')}
                </p>
                <div className="buttons">
                    <button type="button" onClick={toggleSettings}>Close</button>
                    <button type="submit" onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}

Settings.propTypes = {
    settings: settingsType.isRequired,
    toggleSettings: func.isRequired,
    updateSettings: func.isRequired,
}

export default Settings
