import PersonnelListItem from "./personnel-list-item";

const data = [{designation:"Aircraft Mechanic", id:"kdfjkds"}, {designation: "Shop Personnel", id:"kdfjkdc"}, {designation:"Aircraft Engineer", id:"kdfjkde"},]

export default async function PersonnelList() {
  let index = 0;
  return (
    <div className="my-4 bg-gray-100 rounded-xl p-2 flex flex-col gap-2">
      {data.map((personnel) => {
        index++;
        return (
          <PersonnelListItem index={index} personnel={personnel} key={personnel.id} />
        );
      })}
    </div>
  );
}
