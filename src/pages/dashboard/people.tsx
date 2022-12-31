import { useMutation, useQuery } from "@apollo/client";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  Label,
  Modal,
  Select,
  Sidebar,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import { Disc, House, UsersThree, VideoCamera } from "phosphor-react";
import React, { useState } from "react";
import ProtectedPage from "../../components/layout/ProtectedPage";
import Logo from "../../components/Logo";
import {
  ADD_PERSON_AS_MOVIE_DIRECTOR,
  ADD_PERSON_TO_MOVIE_CAST,
  CREATE_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON,
} from "../../graphql/mutations";
import { GET_MOVIES, GET_PEOPLE } from "../../graphql/queries";
import { type Movie, type Person } from "../../graphql/types";

const People: NextPage = () => {
  const { data, loading } = useQuery(GET_PEOPLE);
  const { data: moviesData, loading: loadingMovies } = useQuery(GET_MOVIES);
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [createPerson] = useMutation(CREATE_PERSON);
  const [deletePerson] = useMutation(DELETE_PERSON);
  const [addPersonToMovieCast] = useMutation(ADD_PERSON_TO_MOVIE_CAST);
  const [addPersonAsMovieDirector] = useMutation(ADD_PERSON_AS_MOVIE_DIRECTOR);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showAddAsCastModal, setShowAddAsCastModal] = useState<boolean>(false);
  const [showAddAsDirectorModal, setShowAddAsDirectorModal] =
    useState<boolean>(false);
  const [personToUpdate, setPersonToUpdate] = useState<Person | undefined>();

  const prepUpdate = (person: Person) => {
    setShowUpdateModal(true);
    setPersonToUpdate(person);
  };

  const prepAddAsDirector = (person: Person) => {
    setShowAddAsDirectorModal(true);
    setPersonToUpdate(person);
  };

  const prepAddAsCast = (person: Person) => {
    setShowAddAsCastModal(true);
    setPersonToUpdate(person);
  };

  const update = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      birthYear: { value: string };
    };
    const personInfo = {
      id: personToUpdate?.id,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      birthYear: parseInt(form.birthYear.value),
    };

    updatePerson({
      variables: {
        ...personInfo,
      },
      onCompleted: (data) => {
        if (data.updatePerson) {
          window.location.reload();
          alert("Updated person successfully!");
        } else {
          alert("Something went wrong updating the person record");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong updating the person record");
        console.log(error);
      },
    });
  };

  const create = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      birthYear: { value: string };
    };
    const personInfo = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      birthYear: parseInt(form.birthYear.value),
    };

    createPerson({
      variables: {
        ...personInfo,
      },
      onCompleted: (data) => {
        if (data.createPerson) {
          window.location.reload();
          alert("Created person successfully!");
        } else {
          alert("Something went wrong creating the person record");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong creating the person record");
        console.log(error);
      },
    });
  };

  const addToMovieCast = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      movie: { value: string };
    };
    addPersonToMovieCast({
      variables: {
        mid: form.movie.value,
        pid: personToUpdate?.id ?? "",
      },
      onCompleted: (data) => {
        if (data.addMovieStarredIn) {
          window.location.reload();
          alert("Added person as cast successfully!");
        } else {
          alert("Something went wrong adding the person as cast");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong adding the person as cast");
        console.log(error);
      },
    });
  };

  const addAsMovieDirector = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      movie: { value: string };
    };
    addPersonAsMovieDirector({
      variables: {
        mid: form.movie.value,
        pid: personToUpdate?.id ?? "",
      },
      onCompleted: (data) => {
        if (data.addMovieDirected) {
          window.location.reload();
          alert("Added person as director successfully!");
        } else {
          alert("Something went wrong adding the person as a director");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong adding the person as a director");
        console.log(error);
      },
    });
  };

  const deletePersonRecord = (id: string) => {
    deletePerson({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        if (data.removePerson) {
          window.location.reload();
          alert("Deleted person successfully!");
        } else {
          alert("Something went wrong deleting the person");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong deleting the person");
        console.log(error);
      },
    });
  };

  return (
    <>
      <Head>
        <title>IMDD</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProtectedPage>
        <main className="dark flex max-h-screen min-h-screen min-w-full flex-row bg-gradient-to-r from-[#0d0d0e] to-[#0a0b0d]">
          <div className="flex max-h-screen w-1/6 flex-col px-6 py-8">
            <div className="mb-20">
              <Logo />
            </div>
            <Sidebar className="w-full !bg-gradient-to-r !from-[#0d0d0e] !to-[#0a0b0d]">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="/dashboard"
                    className="!text-[#afadbd]"
                    icon={House}
                  >
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/dashboard/movies"
                    className="!text-[#afadbd]"
                    icon={Disc}
                  >
                    Movies
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/dashboard/people"
                    className="!text-[#afadbd]"
                    icon={UsersThree}
                  >
                    People
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/dashboard/companies"
                    className="!text-[#afadbd]"
                    icon={VideoCamera}
                  >
                    Companies
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div className="flex w-5/6 flex-col">
            <div className="flex min-h-[150px] w-full flex-col items-start justify-between bg-gradient-to-r from-[#3126b0] to-[#6d2fc4] py-8 px-10">
              <Breadcrumb aria-label="Breadcrumbs">
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/dashboard/people">
                  People
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                IMDD People List
              </h1>
            </div>
            <div className="flex h-[75vh] w-full flex-col items-start p-10">
              <Card>
                <div className="flex w-full flex-row justify-end">
                  <Button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Person
                  </Button>
                </div>
                {loading ? (
                  <Spinner size="xl"></Spinner>
                ) : (
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>ID</Table.HeadCell>
                      <Table.HeadCell>First Name</Table.HeadCell>
                      <Table.HeadCell>Last Name</Table.HeadCell>
                      <Table.HeadCell>Birth Year</Table.HeadCell>
                      <Table.HeadCell>Directed</Table.HeadCell>
                      <Table.HeadCell>Acted In</Table.HeadCell>
                      <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {data.people.map((person: Person, index: number) => (
                        <Table.Row key={index}>
                          <Table.Cell>{person.id}</Table.Cell>
                          <Table.Cell>{person.firstName}</Table.Cell>
                          <Table.Cell>{person.lastName}</Table.Cell>
                          <Table.Cell>{person.birthYear}</Table.Cell>
                          <Table.Cell>
                            {person.moviesDirected ? (
                              <div className="flex max-h-12 max-w-lg flex-wrap gap-2 overflow-scroll">
                                {person.moviesDirected?.map(
                                  (movie: Movie, index: number) => (
                                    <Badge color="gray" key={index}>
                                      {movie.title}
                                    </Badge>
                                  )
                                )}
                              </div>
                            ) : (
                              <>N/A</>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {person.moviesStarredIn ? (
                              <div className="flex max-h-12 max-w-lg flex-wrap gap-2 overflow-scroll">
                                {person.moviesStarredIn?.map(
                                  (movie: Movie, index: number) => (
                                    <Badge color="gray" key={index}>
                                      {movie.title}
                                    </Badge>
                                  )
                                )}
                              </div>
                            ) : (
                              <>N/A</>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Dropdown
                              label="Actions"
                              inline={true}
                              placement="left"
                              style={{
                                zIndex: 1000,
                              }}
                            >
                              <Dropdown.Item
                                onClick={() => prepAddAsDirector(person)}
                              >
                                Add as director
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => prepAddAsCast(person)}
                              >
                                Add as cast
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => prepUpdate(person)}>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => deletePersonRecord(person.id)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </Card>
              <Modal
                show={showUpdateModal}
                onClose={() => {
                  setShowUpdateModal(false);
                  setPersonToUpdate(undefined);
                }}
              >
                <Modal.Header>Update Person</Modal.Header>
                <Modal.Body>
                  <form className="flex flex-col gap-4" onSubmit={update}>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="firstName" value="New First Name" />
                      </div>
                      <TextInput
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder={personToUpdate?.firstName ?? ""}
                        defaultValue={personToUpdate?.firstName ?? ""}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="firstName" value="New Last Name" />
                      </div>
                      <TextInput
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder={personToUpdate?.lastName ?? ""}
                        defaultValue={personToUpdate?.lastName ?? ""}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="birthYear" value="New Birth Year" />
                      </div>
                      <TextInput
                        id="birthYear"
                        type="number"
                        name="birthYear"
                        placeholder={personToUpdate?.birthYear.toString() ?? ""}
                        defaultValue={
                          personToUpdate?.birthYear.toString() ?? ""
                        }
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal
                show={showCreateModal}
                onClose={() => {
                  setShowCreateModal(false);
                }}
              >
                <Modal.Header>Create Person</Modal.Header>
                <Modal.Body>
                  <form className="flex flex-col gap-4" onSubmit={create}>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="firstName" value="First Name" />
                      </div>
                      <TextInput id="firstName" type="text" name="firstName" />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="firstName" value="Last Name" />
                      </div>
                      <TextInput id="lastName" type="text" name="lastName" />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="birthYear" value="Birth Year" />
                      </div>
                      <TextInput
                        id="birthYear"
                        type="number"
                        name="birthYear"
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal
                show={showAddAsCastModal}
                onClose={() => {
                  setShowAddAsCastModal(false);
                  setPersonToUpdate(undefined);
                }}
              >
                <Modal.Header>Add Person to Movie Cast</Modal.Header>
                <Modal.Body>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={addToMovieCast}
                  >
                    <div>
                      {loadingMovies ? (
                        <Spinner></Spinner>
                      ) : (
                        <Select required name="movie">
                          {moviesData.movies.map(
                            (movie: Movie, index: number) => (
                              <option key={index} value={movie.id}>
                                {movie.title}
                              </option>
                            )
                          )}
                        </Select>
                      )}
                    </div>
                    <Button type="submit">Add</Button>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal
                show={showAddAsDirectorModal}
                onClose={() => {
                  setShowAddAsDirectorModal(false);
                  setPersonToUpdate(undefined);
                }}
              >
                <Modal.Header>Add Person as Movie Director</Modal.Header>
                <Modal.Body>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={addAsMovieDirector}
                  >
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="movies" value="Select movie" />
                      </div>
                      {loadingMovies ? (
                        <Spinner></Spinner>
                      ) : (
                        <Select required name="movie">
                          {moviesData.movies.map(
                            (movie: Movie, index: number) => (
                              <option key={index} value={movie.id}>
                                {movie.title}
                              </option>
                            )
                          )}
                        </Select>
                      )}
                    </div>
                    <Button type="submit">Add</Button>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </main>
      </ProtectedPage>
    </>
  );
};

export default People;
