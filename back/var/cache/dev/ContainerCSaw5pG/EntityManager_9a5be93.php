<?php

namespace ContainerCSaw5pG;
include_once \dirname(__DIR__, 4).'/vendor/doctrine/persistence/lib/Doctrine/Persistence/ObjectManager.php';
include_once \dirname(__DIR__, 4).'/vendor/doctrine/orm/lib/Doctrine/ORM/EntityManagerInterface.php';
include_once \dirname(__DIR__, 4).'/vendor/doctrine/orm/lib/Doctrine/ORM/EntityManager.php';

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager|null wrapped object, if the proxy is initialized
     */
    private $valueHolder6f665 = null;

    /**
     * @var \Closure|null initializer responsible for generating the wrapped object
     */
    private $initializer7e148 = null;

    /**
     * @var bool[] map of public properties of the parent class
     */
    private static $publicPropertiesc6ab2 = [
        
    ];

    public function getConnection()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getConnection', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getConnection();
    }

    public function getMetadataFactory()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getMetadataFactory', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getMetadataFactory();
    }

    public function getExpressionBuilder()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getExpressionBuilder', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getExpressionBuilder();
    }

    public function beginTransaction()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'beginTransaction', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->beginTransaction();
    }

    public function getCache()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getCache', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getCache();
    }

    public function transactional($func)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'transactional', array('func' => $func), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->transactional($func);
    }

    public function wrapInTransaction(callable $func)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'wrapInTransaction', array('func' => $func), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->wrapInTransaction($func);
    }

    public function commit()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'commit', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->commit();
    }

    public function rollback()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'rollback', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->rollback();
    }

    public function getClassMetadata($className)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getClassMetadata', array('className' => $className), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getClassMetadata($className);
    }

    public function createQuery($dql = '')
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'createQuery', array('dql' => $dql), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->createQuery($dql);
    }

    public function createNamedQuery($name)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'createNamedQuery', array('name' => $name), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->createNamedQuery($name);
    }

    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->createNativeQuery($sql, $rsm);
    }

    public function createNamedNativeQuery($name)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->createNamedNativeQuery($name);
    }

    public function createQueryBuilder()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'createQueryBuilder', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->createQueryBuilder();
    }

    public function flush($entity = null)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'flush', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->flush($entity);
    }

    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->find($className, $id, $lockMode, $lockVersion);
    }

    public function getReference($entityName, $id)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getReference($entityName, $id);
    }

    public function getPartialReference($entityName, $identifier)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getPartialReference($entityName, $identifier);
    }

    public function clear($entityName = null)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'clear', array('entityName' => $entityName), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->clear($entityName);
    }

    public function close()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'close', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->close();
    }

    public function persist($entity)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'persist', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->persist($entity);
    }

    public function remove($entity)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'remove', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->remove($entity);
    }

    public function refresh($entity)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'refresh', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->refresh($entity);
    }

    public function detach($entity)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'detach', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->detach($entity);
    }

    public function merge($entity)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'merge', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->merge($entity);
    }

    public function copy($entity, $deep = false)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->copy($entity, $deep);
    }

    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->lock($entity, $lockMode, $lockVersion);
    }

    public function getRepository($entityName)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getRepository', array('entityName' => $entityName), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getRepository($entityName);
    }

    public function contains($entity)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'contains', array('entity' => $entity), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->contains($entity);
    }

    public function getEventManager()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getEventManager', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getEventManager();
    }

    public function getConfiguration()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getConfiguration', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getConfiguration();
    }

    public function isOpen()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'isOpen', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->isOpen();
    }

    public function getUnitOfWork()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getUnitOfWork', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getUnitOfWork();
    }

    public function getHydrator($hydrationMode)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getHydrator($hydrationMode);
    }

    public function newHydrator($hydrationMode)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->newHydrator($hydrationMode);
    }

    public function getProxyFactory()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getProxyFactory', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getProxyFactory();
    }

    public function initializeObject($obj)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'initializeObject', array('obj' => $obj), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->initializeObject($obj);
    }

    public function getFilters()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'getFilters', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->getFilters();
    }

    public function isFiltersStateClean()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'isFiltersStateClean', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->isFiltersStateClean();
    }

    public function hasFilters()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'hasFilters', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return $this->valueHolder6f665->hasFilters();
    }

    /**
     * Constructor for lazy initialization
     *
     * @param \Closure|null $initializer
     */
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;

        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();

        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);

        $instance->initializer7e148 = $initializer;

        return $instance;
    }

    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;

        if (! $this->valueHolder6f665) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolder6f665 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);

        }

        $this->valueHolder6f665->__construct($conn, $config, $eventManager);
    }

    public function & __get($name)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, '__get', ['name' => $name], $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        if (isset(self::$publicPropertiesc6ab2[$name])) {
            return $this->valueHolder6f665->$name;
        }

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder6f665;

            $backtrace = debug_backtrace(false, 1);
            trigger_error(
                sprintf(
                    'Undefined property: %s::$%s in %s on line %s',
                    $realInstanceReflection->getName(),
                    $name,
                    $backtrace[0]['file'],
                    $backtrace[0]['line']
                ),
                \E_USER_NOTICE
            );
            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder6f665;
        $accessor = function & () use ($targetObject, $name) {
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __set($name, $value)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, '__set', array('name' => $name, 'value' => $value), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder6f665;

            $targetObject->$name = $value;

            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder6f665;
        $accessor = function & () use ($targetObject, $name, $value) {
            $targetObject->$name = $value;

            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __isset($name)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, '__isset', array('name' => $name), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder6f665;

            return isset($targetObject->$name);
        }

        $targetObject = $this->valueHolder6f665;
        $accessor = function () use ($targetObject, $name) {
            return isset($targetObject->$name);
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = $accessor();

        return $returnValue;
    }

    public function __unset($name)
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, '__unset', array('name' => $name), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder6f665;

            unset($targetObject->$name);

            return;
        }

        $targetObject = $this->valueHolder6f665;
        $accessor = function () use ($targetObject, $name) {
            unset($targetObject->$name);

            return;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $accessor();
    }

    public function __clone()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, '__clone', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        $this->valueHolder6f665 = clone $this->valueHolder6f665;
    }

    public function __sleep()
    {
        $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, '__sleep', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;

        return array('valueHolder6f665');
    }

    public function __wakeup()
    {
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
    }

    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializer7e148 = $initializer;
    }

    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializer7e148;
    }

    public function initializeProxy() : bool
    {
        return $this->initializer7e148 && ($this->initializer7e148->__invoke($valueHolder6f665, $this, 'initializeProxy', array(), $this->initializer7e148) || 1) && $this->valueHolder6f665 = $valueHolder6f665;
    }

    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolder6f665;
    }

    public function getWrappedValueHolderValue()
    {
        return $this->valueHolder6f665;
    }
}

if (!\class_exists('EntityManager_9a5be93', false)) {
    \class_alias(__NAMESPACE__.'\\EntityManager_9a5be93', 'EntityManager_9a5be93', false);
}
