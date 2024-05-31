from viewflow import fsm

from pedidos.models.pedido import PedidoEstado


class PedidoFlow:
    state = fsm.State(PedidoEstado, default=PedidoEstado.CREADO)

    def __init__(self, object):
        self.object = object

    @state.setter()
    def _set_object_state(self, value):
        self.object.estado = value

    @state.getter()
    def _get_object_state(self):
        return self.object.estado

    @state.transition(source=PedidoEstado.CREADO, target=PedidoEstado.APROBADO_RESTAURANTE)
    def aprobado_restaurante(self):
        pass

    @state.transition(source=PedidoEstado.APROBADO_RESTAURANTE, target=PedidoEstado.EN_PREPARACION)
    def en_preparacion(self):
        pass

    @state.transition(source=PedidoEstado.EN_PREPARACION, target=PedidoEstado.CHOFER_ASIGNADO)
    def asignar_chofer(self, chofer):
        self.object.chofer = chofer

    @state.transition(source=PedidoEstado.CHOFER_ASIGNADO, target=PedidoEstado.CHOFER_ESPERANDO_PEDIDO)
    def chofer_llego_restaurante(self):
        pass

    @state.transition(source=PedidoEstado.CHOFER_ESPERANDO_PEDIDO, target=PedidoEstado.EN_CAMINO)
    def chofer_lleva_pedido(self):
        pass

    @state.transition(source=PedidoEstado.EN_CAMINO, target=PedidoEstado.ENTREGADO)
    def pedido_entregado(self):
        if self.object.pagado:
            self.object.estado = PedidoEstado.ENTREGADO
        else:
            raise ValueError('El pedido no ha sido pagado')

    @state.transition(source=[
        PedidoEstado.CREADO,
        PedidoEstado.APROBADO_RESTAURANTE

    ], target=PedidoEstado.CANCELADO_CLIENTE)
    def cancelar_cliente(self, razon_cancelacion):
        self.object.razon_cancelacion = razon_cancelacion

    @state.transition(source=[
        PedidoEstado.CREADO,
        PedidoEstado.APROBADO_RESTAURANTE,
        PedidoEstado.EN_PREPARACION
    ], target=PedidoEstado.CANCELADO_RESTAURANTE)
    def cancelar_restaurante(self, razon_cancelacion):
        self.object.razon_cancelacion = razon_cancelacion

    @state.transition(source=[
        PedidoEstado.CREADO,
        PedidoEstado.APROBADO_RESTAURANTE,
        PedidoEstado.EN_PREPARACION,
        PedidoEstado.CHOFER_ASIGNADO,
        PedidoEstado.CHOFER_ESPERANDO_PEDIDO,
        PedidoEstado.EN_CAMINO
    ], target=PedidoEstado.ANULAR)
    def anular(self):
        self.object.razon_cancelacion = 'Anulado por la empresa'
