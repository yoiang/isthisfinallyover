import React from 'react'
import useSWR from 'swr'
import api from '../constants/api'
import { NotOver, Over } from '../model/IsItFinallyOver'

export interface Props {
    refreshInterval: number
    initialData?: Response | void
}
const useIsThisFinallyOver = (props: Props) => {
    const [error, setError] = React.useState<Error | null>(null)
    const [result, setResult] = React.useState<void | Over | NotOver>(null)

    const { data, error: swrError } = useSWR(api.over, fetch, {
        refreshInterval: props.refreshInterval,
        initialData: props.initialData 
    })

    React.useEffect(() => {
        setError(swrError)
    }, [swrError])

    React.useEffect(() => {
        if (data) {
            data.json()
                .then((json) => {
                if (json.over === true) {
                    setResult(json as Over)
                } else {
                    setResult(json as NotOver)
                }

                return json
            })
        } else if (result !== null) {
            setResult(null)
        }
    }, [data])

    return {
        result,
        error
    }
}

export default useIsThisFinallyOver