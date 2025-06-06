export default function AdminHome() {
    useEffect(() => {
        // Proteção de rotas
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.tipo !== 'adm') {
            router.push('/login');
        } else {
            connectBack.get('/dashboard').then((res) => {
                setData(res.data);
            });
        }
    }, []);
    return (
        <></>
    )
}