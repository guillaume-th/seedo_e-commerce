<?php

namespace ContainerZ3woC4b;
include_once \dirname(__DIR__, 4).'/vendor/doctrine/persistence/lib/Doctrine/Persistence/ObjectManager.php';
include_once \dirname(__DIR__, 4).'/vendor/doctrine/orm/lib/Doctrine/ORM/EntityManagerInterface.php';
include_once \dirname(__DIR__, 4).'/vendor/doctrine/orm/lib/Doctrine/ORM/EntityManager.php';

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager|null wrapped object, if the proxy is initialized
     */
    private $valueHolderdfa57 = null;

    /**
     * @var \Closure|null initializer responsible for generating the wrapped object
     */
    private $initializer27b8c = null;

    /**
     * @var bool[] map of public properties of the parent class
     */
    private static $publicPropertiesd52f5 = [
        
    ];

    public function getConnection()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getConnection', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getConnection();
    }

    public function getMetadataFactory()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getMetadataFactory', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getMetadataFactory();
    }

    public function getExpressionBuilder()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getExpressionBuilder', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getExpressionBuilder();
    }

    public function beginTransaction()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'beginTransaction', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->beginTransaction();
    }

    public function getCache()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getCache', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getCache();
    }

    public function transactional($func)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'transactional', array('func' => $func), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->transactional($func);
    }

    public function wrapInTransaction(callable $func)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'wrapInTransaction', array('func' => $func), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->wrapInTransaction($func);
    }

    public function commit()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'commit', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->commit();
    }

    public function rollback()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'rollback', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->rollback();
    }

    public function getClassMetadata($className)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getClassMetadata', array('className' => $className), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getClassMetadata($className);
    }

    public function createQuery($dql = '')
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'createQuery', array('dql' => $dql), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->createQuery($dql);
    }

    public function createNamedQuery($name)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'createNamedQuery', array('name' => $name), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->createNamedQuery($name);
    }

    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->createNativeQuery($sql, $rsm);
    }

    public function createNamedNativeQuery($name)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->createNamedNativeQuery($name);
    }

    public function createQueryBuilder()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'createQueryBuilder', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->createQueryBuilder();
    }

    public function flush($entity = null)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'flush', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->flush($entity);
    }

    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->find($className, $id, $lockMode, $lockVersion);
    }

    public function getReference($entityName, $id)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getReference($entityName, $id);
    }

    public function getPartialReference($entityName, $identifier)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getPartialReference($entityName, $identifier);
    }

    public function clear($entityName = null)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'clear', array('entityName' => $entityName), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->clear($entityName);
    }

    public function close()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'close', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->close();
    }

    public function persist($entity)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'persist', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->persist($entity);
    }

    public function remove($entity)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'remove', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->remove($entity);
    }

    public function refresh($entity)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'refresh', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->refresh($entity);
    }

    public function detach($entity)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'detach', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->detach($entity);
    }

    public function merge($entity)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'merge', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->merge($entity);
    }

    public function copy($entity, $deep = false)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->copy($entity, $deep);
    }

    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->lock($entity, $lockMode, $lockVersion);
    }

    public function getRepository($entityName)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getRepository', array('entityName' => $entityName), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getRepository($entityName);
    }

    public function contains($entity)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'contains', array('entity' => $entity), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->contains($entity);
    }

    public function getEventManager()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getEventManager', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getEventManager();
    }

    public function getConfiguration()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getConfiguration', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getConfiguration();
    }

    public function isOpen()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'isOpen', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->isOpen();
    }

    public function getUnitOfWork()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getUnitOfWork', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getUnitOfWork();
    }

    public function getHydrator($hydrationMode)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getHydrator($hydrationMode);
    }

    public function newHydrator($hydrationMode)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->newHydrator($hydrationMode);
    }

    public function getProxyFactory()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getProxyFactory', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getProxyFactory();
    }

    public function initializeObject($obj)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'initializeObject', array('obj' => $obj), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->initializeObject($obj);
    }

    public function getFilters()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'getFilters', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->getFilters();
    }

    public function isFiltersStateClean()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'isFiltersStateClean', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->isFiltersStateClean();
    }

    public function hasFilters()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'hasFilters', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return $this->valueHolderdfa57->hasFilters();
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

        $instance->initializer27b8c = $initializer;

        return $instance;
    }

    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;

        if (! $this->valueHolderdfa57) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolderdfa57 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);

        }

        $this->valueHolderdfa57->__construct($conn, $config, $eventManager);
    }

    public function & __get($name)
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, '__get', ['name' => $name], $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        if (isset(self::$publicPropertiesd52f5[$name])) {
            return $this->valueHolderdfa57->$name;
        }

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderdfa57;

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

        $targetObject = $this->valueHolderdfa57;
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
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, '__set', array('name' => $name, 'value' => $value), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderdfa57;

            $targetObject->$name = $value;

            return $targetObject->$name;
        }

        $targetObject = $this->valueHolderdfa57;
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
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, '__isset', array('name' => $name), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderdfa57;

            return isset($targetObject->$name);
        }

        $targetObject = $this->valueHolderdfa57;
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
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, '__unset', array('name' => $name), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderdfa57;

            unset($targetObject->$name);

            return;
        }

        $targetObject = $this->valueHolderdfa57;
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
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, '__clone', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        $this->valueHolderdfa57 = clone $this->valueHolderdfa57;
    }

    public function __sleep()
    {
        $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, '__sleep', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;

        return array('valueHolderdfa57');
    }

    public function __wakeup()
    {
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
    }

    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializer27b8c = $initializer;
    }

    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializer27b8c;
    }

    public function initializeProxy() : bool
    {
        return $this->initializer27b8c && ($this->initializer27b8c->__invoke($valueHolderdfa57, $this, 'initializeProxy', array(), $this->initializer27b8c) || 1) && $this->valueHolderdfa57 = $valueHolderdfa57;
    }

    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolderdfa57;
    }

    public function getWrappedValueHolderValue()
    {
        return $this->valueHolderdfa57;
    }
}

if (!\class_exists('EntityManager_9a5be93', false)) {
    \class_alias(__NAMESPACE__.'\\EntityManager_9a5be93', 'EntityManager_9a5be93', false);
}
