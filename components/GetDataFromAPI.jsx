import React, { useState, useEffect } from 'react'

const GetDataFromAPI = (apiEndpoint) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint)
                const responseData = await response.json()

                setData(responseData)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchData()
    }, [apiEndpoint])

    return data
}

export default GetDataFromAPI