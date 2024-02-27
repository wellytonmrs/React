import { useState, useEffect, useMemo, useCallback } from 'react';

interface UserData {
    name: string;
    age: number;
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

function Learning() {

    const [user, setUser] = useState<UserData>({ name: '', age: 0 });
    const [post, setPost] = useState<Post | null>(null);
    const [number, setNumber] = useState(0);
    const [count, setCount] = useState(0);
    const [multiplier, setMultiplier] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    useEffect(() => {
        // Fetch data from an API
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => {
                // Update state with the fetched data
                setPost(data);
            });

        // Cleanup function (not needed in this case)
    }, []); // Empty dependency array means this effect runs only once after the initial render

    // Expensive calculation function
    const calculateFactorial = (n: number): number => {
        console.log('Calculating factorial...');
        if (n <= 1) return 1;
        return n * calculateFactorial(n - 1);
    };

    // Memoize the result of the expensive calculation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const factorial = useMemo(() => calculateFactorial(number), [number]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Username: " + user.name + " Age: " + user.age);
    };

    const handleClick = () => {
        console.log(`Button clicked! Count: ${count}`);
        setCount(prevCount => prevCount + multiplier);
    };

    // Memoize the callback function
    const memoizedHandleClick = useCallback(handleClick, [multiplier]);


    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={handleChange} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={user.age} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
            </form>
            <br />
            {post && (
                <div>
                    <h2>Post</h2>
                    <p>Title: {post.title}</p>
                    <p>Body: {post.body}</p>
                </div>
            )}
            <p>Number: {number}</p>
            <p>Factorial: {factorial}</p>
            <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
            <br />
            
            <p>Count: {count}</p>
            <p>Multiplier: {multiplier}</p>
            <button onClick={memoizedHandleClick}>Increment</button>
            <button onClick={() => setMultiplier(prevMultiplier => prevMultiplier * 2)}>Double Multiplier</button>

        </div>
    );
}

export default Learning;
