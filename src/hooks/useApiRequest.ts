import { useRef, useState } from 'react';

import ApiCaller from '../services';

export interface IApiRequest<input, output> {
    apiCall: (data: input) => Promise<output>;
    loading: boolean;
}

const useApiRequest = <input, output>(requestInfo: (a: typeof ApiCaller) => ((data:input) => Promise<output>)): IApiRequest<input, output> => {
    const [loading, setLoading] = useState(false);
    const requestParamsRef = useRef<input | null>(null);
    
    const apiCall = async (data: input): Promise<output> => (
        new Promise(async (resolve, reject) => {
					requestParamsRef.current = data;
					setLoading(true);
					const result = await requestInfo(ApiCaller)(data);
					setTimeout(() => setLoading(false), 500);
					resolve(result);
        })
    );

    return {
        apiCall,
        loading,
    };
};

export default useApiRequest;
