
export default async function ClientPasswordInput() {

    return (
        <div className="flex items-center justify-center h-svh bg-slate-400">
            <form >
                <input className="h-12" type="password" id="password" name="password" placeholder="Password" required />
            </form>
        </div>

    );
}