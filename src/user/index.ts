
interface IUserProps {
    id: string;
    name: string;
}

const UserComponent = (props: IUserProps) => {
    const { id, name } = props;
    if (!id || !name) {
        return 'user id or name is missing'
    }
    return `
      <h1>User Details</h1>
      <p>User Id: ${id}</p>
      <p>User Name: ${name}</p>
      <a href="#">Back</a>
    `
}

export default UserComponent;