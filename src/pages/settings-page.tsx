import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { TitlePage } from "@/components/ui/title-page";
import { Lock, LockIcon, Save, User } from "lucide-react";

export function SettingsPage() {
    return (
        <div className=" p-6 space-y-6">
            <TitlePage title="Configurações" description="Gerencie seu perfil e preferências" />

            <div className="flex w-full flex-col gap-6">
                <Tabs defaultValue="profile">
                    <TabsList>
                        <TabsTrigger value="profile"><User /> Perfil</TabsTrigger>
                        <TabsTrigger value="security"><Lock />Segurança</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" >
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações do Perfil</CardTitle>
                            </CardHeader>
                            <CardContent className={`
                        grid gap-6 w-full
                    `}>
                                <div className="flex gap-4 items-start">
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-name">Nome Completo</Label>
                                        <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-username">E-mail</Label>
                                        <Input id="tabs-demo-username" disabled defaultValue="@peduarte" />
                                        <span className="text-[.7rem]">O e-mail não pode ser alterado</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="bg-primary-background hover:bg-sky-600 text-white"><Save />Salvar Alterações</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Alterar Senha</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Senha Atual</Label>
                                    <Input type="password" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Nova Senha</Label>
                                    <Input type="password" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Confirmar Nova Senha</Label>
                                    <Input type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="bg-primary-background hover:bg-sky-600 text-white"><LockIcon />Alterar Senha</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}