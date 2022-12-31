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
  ADD_PRODUCTION_TO_COMPANY,
  CREATE_PRODUCTION_COMPANY,
  DELETE_PRODUCTION_COMPANY,
  UPDATE_PRODUCTION_COMPANY,
} from "../../graphql/mutations";
import { GET_COMPANIES, GET_MOVIES } from "../../graphql/queries";
import { type Movie, type ProductionCompany } from "../../graphql/types";

const Companies: NextPage = () => {
  const { data, loading } = useQuery(GET_COMPANIES);
  const { data: moviesData, loading: loadingMovies } = useQuery(GET_MOVIES);
  const [updateProductionCompany] = useMutation(UPDATE_PRODUCTION_COMPANY);
  const [createProductionCompany] = useMutation(CREATE_PRODUCTION_COMPANY);
  const [deleteProductionCompany] = useMutation(DELETE_PRODUCTION_COMPANY);
  const [addProductionToCompany] = useMutation(ADD_PRODUCTION_TO_COMPANY);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showAddProductionModal, setShowAddProductionModal] =
    useState<boolean>(false);
  const [productionCompanyToUpdate, setProductionCompanyToUpdate] = useState<
    ProductionCompany | undefined
  >();

  const prepUpdate = (productionCompany: ProductionCompany) => {
    setShowUpdateModal(true);
    setProductionCompanyToUpdate(productionCompany);
  };

  const prepAddProduction = (productionCompany: ProductionCompany) => {
    setShowAddProductionModal(true);
    setProductionCompanyToUpdate(productionCompany);
  };

  const update = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      name: { value: string };
      established: { value: string };
    };
    const productionCompanyInfo = {
      id: productionCompanyToUpdate?.id,
      name: form.name.value,
      established: parseInt(form.established.value),
    };

    updateProductionCompany({
      variables: {
        ...productionCompanyInfo,
      },
      onCompleted: (data) => {
        if (data.updateProductionCompany) {
          window.location.reload();
          alert("Updated production company successfully!");
        } else {
          alert("Something went wrong updating the production company record");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong updating the production company record");
        console.log(error);
      },
    });
  };

  const create = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      name: { value: string };
      established: { value: string };
    };
    const productionCompanyInfo = {
      name: form.name.value,
      established: parseInt(form.established.value),
    };

    createProductionCompany({
      variables: {
        ...productionCompanyInfo,
      },
      onCompleted: (data) => {
        if (data.createProductionCompany) {
          window.location.reload();
          alert("Created production company successfully!");
        } else {
          alert("Something went wrong creating the production company record");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong creating the production company record");
        console.log(error);
      },
    });
  };

  const addProduction = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as typeof event.target & {
      movie: { value: string };
    };
    addProductionToCompany({
      variables: {
        mid: form.movie.value,
        pcid: productionCompanyToUpdate?.id ?? "",
      },
      onCompleted: (data) => {
        if (data.addProduction) {
          window.location.reload();
          alert("Added production to company!");
        } else {
          alert("Something went wrong adding the production");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong adding the production company as cast");
        console.log(error);
      },
    });
  };

  const deleteProductionCompanyRecord = (id: string) => {
    deleteProductionCompany({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        if (data.removeProductionCompany) {
          window.location.reload();
          alert("Deleted production company successfully!");
        } else {
          alert("Something went wrong deleting the production company");
          console.log(data);
        }
      },
      onError: (error) => {
        // alert("Something went wrong deleting the production company");
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
                <Breadcrumb.Item href="/dashboard/companies">
                  Companies
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                IMDD Company List
              </h1>
            </div>
            <div className="flex h-[75vh] w-full flex-col items-start p-10">
              <Card>
                <div className="flex w-full flex-row justify-end">
                  <Button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Production Company
                  </Button>
                </div>
                {loading ? (
                  <Spinner size="xl"></Spinner>
                ) : (
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>ID</Table.HeadCell>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Year Established</Table.HeadCell>
                      <Table.HeadCell>Productions</Table.HeadCell>
                      <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {data.productionCompanies.map(
                        (
                          productionCompany: ProductionCompany,
                          index: number
                        ) => (
                          <Table.Row key={index}>
                            <Table.Cell>{productionCompany.id}</Table.Cell>
                            <Table.Cell>{productionCompany.name}</Table.Cell>
                            <Table.Cell>
                              {productionCompany.established}
                            </Table.Cell>
                            <Table.Cell>
                              {productionCompany.productions ? (
                                <div className="flex max-h-12 max-w-lg flex-wrap gap-2 overflow-scroll">
                                  {productionCompany.productions?.map(
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
                              >
                                <Dropdown.Item
                                  onClick={() =>
                                    prepAddProduction(productionCompany)
                                  }
                                >
                                  Add production
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => prepUpdate(productionCompany)}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    deleteProductionCompanyRecord(
                                      productionCompany.id
                                    )
                                  }
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown>
                            </Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                )}
              </Card>
              <Modal
                show={showUpdateModal}
                onClose={() => {
                  setShowUpdateModal(false);
                  setProductionCompanyToUpdate(undefined);
                }}
              >
                <Modal.Header>Update Production Company</Modal.Header>
                <Modal.Body>
                  <form className="flex flex-col gap-4" onSubmit={update}>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="New Company Name" />
                      </div>
                      <TextInput
                        id="name"
                        type="text"
                        name="name"
                        placeholder={productionCompanyToUpdate?.name ?? ""}
                        defaultValue={productionCompanyToUpdate?.name ?? ""}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="established"
                          value="New Year Established"
                        />
                      </div>
                      <TextInput
                        id="established"
                        type="number"
                        name="established"
                        placeholder={
                          productionCompanyToUpdate?.established.toString() ??
                          ""
                        }
                        defaultValue={
                          productionCompanyToUpdate?.established.toString() ??
                          ""
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
                <Modal.Header>Create Production Company</Modal.Header>
                <Modal.Body>
                  <form className="flex flex-col gap-4" onSubmit={create}>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Company Name" />
                      </div>
                      <TextInput id="name" type="text" name="name" />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="established" value="Year Established" />
                      </div>
                      <TextInput
                        id="established"
                        type="number"
                        name="established"
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal
                show={showAddProductionModal}
                onClose={() => {
                  setShowAddProductionModal(false);
                  setProductionCompanyToUpdate(undefined);
                }}
              >
                <Modal.Header>Add Production to Company</Modal.Header>
                <Modal.Body>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={addProduction}
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
            </div>
          </div>
        </main>
      </ProtectedPage>
    </>
  );
};

export default Companies;
